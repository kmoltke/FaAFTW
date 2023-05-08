import styles from "./GoBackButton.module.css"
import { useNavigate } from "react-router-dom"

function GoBackButton() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <section style={{ padding: "20px 50px 10px 50p" }}>
      <button onClick={goBack} className={styles.button}>
        ← go back
      </button>
    </section>
  )
}

export default GoBackButton
