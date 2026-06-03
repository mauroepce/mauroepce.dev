@AGENTS.md

---

# portafolio-profesional — Convenciones del workspace

<!--
  Este bloque fue generado por /setup. Claude lo carga automáticamente en cada
  sesión de este workspace, así que lo que escribas aquí siempre está en su contexto.
  Convive con @AGENTS.md (instrucciones del portafolio Next.js) — ambos aplican.
-->

## Propósito

Workspace para gestionar **postulaciones** a empleos y propuestas freelance. Cada postulación es un subproyecto con su propio estado, para no perder de vista en qué etapa va cada una ni cuál es el próximo paso.

## Estructura

- Las postulaciones viven en `postulaciones/`.
- Cada postulación tiene su propio `CLAUDE.md` (datos estables: empresa, rol, link) y `STATUS.md` (estado vivo: etapa, próximos pasos, notas).
- El `INDEX.md` de la raíz lista todas las postulaciones de un vistazo.
- Ver `docs/ARCHITECTURE.md` para la explicación completa del patrón.

## Convenciones

- Lo estable (empresa, rol, descripción del puesto) va en los `CLAUDE.md`.
- El estado vivo (etapa, próximos pasos, notas) va en los `STATUS.md`.
- Toda decisión importante queda registrada en el `STATUS.md` con el **porqué**, no solo el qué.

## Mantenimiento automático del STATUS.md (instrucción para Claude)

Tú (Claude) eres responsable de mantener cada `STATUS.md` al día. El usuario NO debería tener que acordarse de actualizarlo. En concreto:

1. **Al final de cada sesión** con trabajo significativo sobre una postulación (avance, cambio de etapa, decisión tomada, próximos pasos identificados): actualiza proactivamente su `STATUS.md` antes de terminar la conversación. No pidas permiso — hazlo como parte de cerrar.
2. **Qué actualizar**: la fecha de `Última actualización`, la etapa, los próximos pasos (marca los completados con `[x]`), cualquier nota o contacto nuevo, y cualquier decisión tomada (con el **porqué**).
3. **Qué NO hacer**: no agregues ruido, no repitas lo que ya está, no actualices si no hubo trabajo real, no actualices por preguntas meramente exploratorias.
4. **El usuario puede forzar un checkpoint** cuando quiera con `/checkpoint`.
5. **El usuario también puede editar el `STATUS.md` directamente**; respeta sus ediciones.

## Reglas propias

- **Actualizar el `STATUS.md` después de cada sesión.** Razón: el sistema solo funciona si el estado refleja la realidad al cerrar.
- **Actualizar el `STATUS.md` después de cada decisión importante** (con el porqué), sin esperar al final de la sesión. Razón: las decisiones se olvidan; el motivo es lo más valioso de conservar.

## Comandos

- `/postular <empresa>` — crea una nueva postulación en `postulaciones/` con su `CLAUDE.md` y `STATUS.md`.
- `/new-project <nombre>` — crea un subproyecto genérico (equivalente de bajo nivel a `/postular`).
- `/status` — resumen de todas las postulaciones y sus próximos pasos abiertos.
- `/checkpoint` — fuerza la actualización del `STATUS.md` de la postulación actual según el trabajo de esta sesión.

## Al retomar el trabajo

Si vuelves después de una pausa:
1. Lee el `INDEX.md` de la raíz para la vista general.
2. Lee el `STATUS.md` de la postulación en la que estás trabajando.
3. Recién entonces empieza.
