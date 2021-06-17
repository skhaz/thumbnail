import styles from './Title.module.css'

export function Title({ owner, name }) {
  return (
    <span className={styles.error}>
      {owner}/<strong>{name}</strong>
    </span>
  )
}
