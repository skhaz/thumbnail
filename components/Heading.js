import styles from './Heading.module.css'

export function Heading({ first, second }) {
  return (
    <span className={styles.error}>
      {first}/<strong>{second}</strong>
    </span>
  )
}
