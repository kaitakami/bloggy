import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import styles from "../../styles/Slug.module.css";

const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/cl9axkls73gcz01um3sccc1v3/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
  };
}

const BlogPost = ({ post }) => {
  return (
    <main className={styles.blog}>
      <div className={styles.coverPhotoContainer}>
        <Image
          layout="fill"
          src={post.coverPhoto.url}
          className={styles.cover}
          alt="Blog Post cover photo"
        />
      </div>
      <div className={styles.title}>
        <div className={styles.avatarContainer}>
          <Image
            layout="fill"

            src={post.author.avatar.url}
            className={styles.avatar}
            alt="Author avatar"

          />
        </div>
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.data}>{post.datePublished}</h6>
        </div>
      </div>
      <h2>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
};

export default BlogPost;
