#!/usr/bin/env bash
# signal — post a new entry to the mauroepce.dev Signal feed
#
# Usage:
#   signal "<title>" "<excerpt>" [tags]
#   echo "..." | signal "<title>" "<excerpt>" [tags]      # with body
#   signal "<title>" "<excerpt>" [tags] < body.md         # with body from file
#
# Args:
#   <title>      Required. Short, direct title for the entry.
#   <excerpt>    Required. 1-2 sentences shown in the feed card.
#   [tags]       Optional. Comma-separated, e.g. "chiletravel,architecture".
#   stdin        Optional. Markdown body content for the detail page.
#                If stdin is a pipe/redirect, content is appended after the frontmatter.
#
# Examples:
#   signal "Fixed geo cache bug" "Stale data leaking across location changes." "chiletravel,bug"
#
#   signal "Cache architecture deep dive" "3-level cache hits sub-50ms." "chiletravel,architecture" <<'EOF'
#   ## The problem
#   We needed sub-100ms reads for nearby places...
#
#   ## The solution
#   Three layers: in-memory LRU, IndexedDB, then Firestore...
#   EOF
#
# Behavior:
#   - Creates content/signal/YYYY-MM-DD-<slug>.mdx in the portfolio repo
#   - Commits only that file (does not touch other in-progress changes)
#   - Pushes if a remote is configured, else leaves commit local

set -euo pipefail

PORTFOLIO_DIR="/Users/mauriciopatino/github/mauroepce"
SIGNAL_DIR="$PORTFOLIO_DIR/content/signal"

if [[ $# -lt 2 ]]; then
  cat <<EOF
Usage: signal "<title>" "<excerpt>" [tag1,tag2,...]

Optional markdown body via stdin:
  echo "Long content" | signal "Title" "Excerpt" "tags"
  signal "Title" "Excerpt" "tags" < body.md

Examples:
  signal "Fixed geo cache bug" "Stale data leaking across location changes." "chiletravel,bug"

  signal "Cache architecture" "3-level cache hits sub-50ms." "architecture" <<'EOF'
  ## The problem
  Detailed explanation here...
  EOF
EOF
  exit 1
fi

TITLE="$1"
EXCERPT="$2"
TAGS_RAW="${3:-}"

# Read body from stdin if not a terminal (i.e., something is piped/redirected in)
BODY=""
if [ ! -t 0 ]; then
  BODY=$(cat)
fi

# Build YAML tags array from comma-separated input
if [[ -n "$TAGS_RAW" ]]; then
  TAGS_YAML="["
  IFS=',' read -ra TAG_ARR <<< "$TAGS_RAW"
  for i in "${!TAG_ARR[@]}"; do
    TAG=$(echo "${TAG_ARR[$i]}" | sed 's/^ *//;s/ *$//')
    TAGS_YAML+="\"$TAG\""
    if [[ $i -lt $((${#TAG_ARR[@]} - 1)) ]]; then
      TAGS_YAML+=", "
    fi
  done
  TAGS_YAML+="]"
else
  TAGS_YAML="[]"
fi

DATE=$(date +%Y-%m-%d)
WEEK="W$(date +%V)"
SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9]/-/g' \
  | sed 's/--*/-/g' \
  | sed 's/^-//;s/-$//' \
  | cut -c1-50)

FILE="$SIGNAL_DIR/${DATE}-${SLUG}.mdx"

mkdir -p "$SIGNAL_DIR"

# Escape double quotes in title and excerpt for YAML
TITLE_ESCAPED=$(printf '%s' "$TITLE" | sed 's/"/\\"/g')
EXCERPT_ESCAPED=$(printf '%s' "$EXCERPT" | sed 's/"/\\"/g')

{
  echo "---"
  echo "title: \"$TITLE_ESCAPED\""
  echo "date: \"$DATE\""
  echo "week: \"$WEEK\""
  echo "tags: $TAGS_YAML"
  echo "excerpt: \"$EXCERPT_ESCAPED\""
  echo "---"
  if [[ -n "$BODY" ]]; then
    echo ""
    echo "$BODY"
  fi
} > "$FILE"

cd "$PORTFOLIO_DIR"
git add "content/signal/$(basename "$FILE")"
git commit -m "signal: $TITLE"

echo ""
echo "✓ Signal posted: $TITLE"
echo "  File: $(basename "$FILE")"
if [[ -n "$BODY" ]]; then
  BODY_LINES=$(echo "$BODY" | wc -l | tr -d ' ')
  echo "  Body: $BODY_LINES lines"
fi

# Only push if a remote is configured
if git remote get-url origin >/dev/null 2>&1; then
  if git push 2>&1; then
    echo "  Pushed to origin. Vercel redeploys in ~30s."
  else
    echo "  ⚠ Push failed. Commit is local — push manually when ready."
  fi
else
  echo "  No git remote configured. Committed locally only."
  echo "  To enable auto-deploy: cd $PORTFOLIO_DIR && git remote add origin <github-url>"
fi
