import styles from "./Divider.module.css";

function Divider() {
  return (
    <div className={styles.divider}>
      <span></span>
      <p>or</p>
      <span></span>
    </div>
  );
}

export default Divider;