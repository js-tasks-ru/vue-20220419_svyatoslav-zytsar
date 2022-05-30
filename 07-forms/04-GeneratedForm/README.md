# GeneratedForm

Задача кажется сложной только на первый взгляд. С использованием динамических компонентов решение сводится к простому
циклу и привязке значений.

```html
<ui-form-group v-for="(spec, field) in schema" :key="field" :label="spec.label">
  <component :is="spec.component" v-model="localAgendaItem[field]" v-bind="spec.props" />
</ui-form-group>
```

Остальной код компонента не отличается от предыдущей задачи.
