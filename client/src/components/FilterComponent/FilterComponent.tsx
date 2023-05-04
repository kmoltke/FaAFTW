import styles from './FilterComponent.module.css'
import '../../styles/template.css'

type FilterComponentProps = {
  category: string
  value: string | undefined
  onChange: (key: string, val: string) => void
  data: string[]
}

function FilterComponent(props: FilterComponentProps) {
  const category = props.category
  const param = category.toLowerCase()
  return (
    <div className={styles.filterWrap}>
      <select
        defaultValue={props.category}
        value={props.category}
        className={styles.filterComponentSelect}
        onChange={(e) => {
          props.onChange(param, e.target.value)
        }}
      >
        <option value={''}>{category}</option>

        {props.data.map((item: any) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <span className={styles.icon}> ▼ </span>
    </div>
  )
}

export default FilterComponent
