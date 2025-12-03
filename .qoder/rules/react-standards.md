---
trigger: always_on
alwaysApply: true
---
# React Component Standards

## Structure & Organization 结构规范
1. 优先使用函数组件 + React Hooks（禁止使用 Class 组件）；
2. 组件默认导出（`export default Component`），工具函数/辅助变量命名导出（`export const helper = () => {}`）；
3. 单个组件核心逻辑不超过 200 行；若逻辑复杂，拆分「子组件」或「自定义 Hook」（如表单逻辑拆为`useForm()`）；
4. 组件文件目录：相关组件放在同一文件夹，公共组件统一放在`src/components/`目录；
5. 组件内部顺序：导入 → 类型定义 → 自定义Hook → 辅助函数 → 组件主体 → 导出。

## TypeScript Integration TS 类型规范
1. 组件 Prop 必须定义接口（`interface ComponentProps {}`），并通过`Component(props: ComponentProps)`或`React.FC<ComponentProps>`指定；
2. 接口命名规范：组件名 + Props（如`ButtonProps`），避免模糊命名（如`Props`）；
3. 可复用组件（如表格、列表）使用泛型（`interface TableProps<T> { data: T[] }`），提升灵活性；
4. 禁止直接使用`any`类型；若暂时无法确定类型，用`unknown`并配合类型守卫（`typeof`/`is`判断）；
5. 可选 Prop 用`?`标记（如`title?: string`），必填 Prop 明确声明，避免隐式`undefined`。

## Performance Optimization 性能优化规范
1. 事件处理函数（如`onClick`回调）用`useCallback`包裹，依赖项数组按需填写（避免空数组过度缓存）；
   - 示例：`const handleClick = useCallback(() => { ... }, [依赖变量])`；
2. 耗时计算（如大数据过滤、复杂格式化）用`useMemo`缓存结果，依赖项变化时才重新计算；
   - 示例：`const filteredData = useMemo(() => data.filter(...), [data])`；
3. 纯组件（仅依赖 Prop 渲染，无内部状态/副作用）用`React.memo`包裹，避免父组件重渲染时自身无意义刷新；
   - 示例：`const PureComponent = React.memo(MyComponent)`；
4. 优化边界：
   - 简单组件（无复杂逻辑/耗时操作）无需强制`useCallback`/`useMemo`（避免过度优化增加开销）；
   - 频繁变化的 Prop（如函数、对象），避免用`React.memo`（缓存失效反而影响性能）。