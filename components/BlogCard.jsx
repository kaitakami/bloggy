import Link from "next/link";
import Image from "next/image";
import styles from "../styles/BlogCard.module.css";

const BlogCard = ({ id, title, author, coverPhoto, datePublished, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imgContainer}>
          <Image
            layout="fill"
            src={coverPhoto.url}
            alt="Cover Photo"
            className={styles.coverPhoto}
          />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <div>
              <Image
                layout="fill"
                src={author.avatar.url}
                alt="Author Avatar"
                className={styles.authorImage}
              />
            </div>
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{datePublished}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
