---
description: Crea una nueva postulación en postulaciones/ con su CLAUDE.md y STATUS.md, y la registra en INDEX.md.
---

# /postular — Agregar una nueva postulación

Cuando el usuario ejecute `/postular <empresa>`:

## Fase 1 — Validar

1. Verifica que existan `_templates/subproject-CLAUDE.md.tmpl` y `_templates/subproject-STATUS.md.tmpl`. Si no, dile al usuario que ejecute `/setup` primero.
2. Si no se entregó `<empresa>` en el comando, pregunta: "¿A qué empresa estás postulando?". Usa kebab-case para el nombre de la carpeta (ej: `acme-corp`).
3. Pregunta también, de forma breve: "¿Qué rol?" y "¿Link a la oferta? (opcional)".

## Fase 2 — Crear

1. Crea el directorio: `postulaciones/<empresa>/`.
2. Copia `_templates/subproject-CLAUDE.md.tmpl` → `postulaciones/<empresa>/CLAUDE.md`. Reemplaza `{{NAME}}` por el nombre de la empresa y rellena **Empresa**, **Rol** y **Link a la oferta** con lo que dio el usuario.
3. Copia `_templates/subproject-STATUS.md.tmpl` → `postulaciones/<empresa>/STATUS.md`. Pon la fecha de hoy en `Última actualización`, rellena **Empresa y rol**, y deja la **Etapa** en `Por enviar`.
4. Agrega una fila a `INDEX.md` de la raíz, preservando la estructura de columnas (Postulación · Empresa / Rol · Etapa · Última actualización · Detalle).

## Fase 3 — Confirmar

Imprime al usuario:

```
✅ Postulación creada en postulaciones/<empresa>/
   - CLAUDE.md (datos de la empresa y el rol)
   - STATUS.md (estado vivo — mantenlo al día)
   - Agregada a INDEX.md

Tip: abre el STATUS.md y completa los próximos pasos. Marca la etapa "Enviada"
cuando la mandes.
```

Luego pregunta: "¿Quieres que abra el STATUS.md para completar más detalle ahora?"

## Reglas

- NO crees una postulación si el nombre choca con una existente — pide al usuario que la renombre.
- NO te saltes la actualización de `INDEX.md` — así el workspace se mantiene navegable.
- USA siempre español para todo el texto visible al usuario.
