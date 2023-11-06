import styles from "./Avatar.module.css";

function Avatar({ imgUrl }) {
    return (
        <img src={imgUrl} alt="User Image" className={styles.avatarImage} />
    );
}

export default Avatar;