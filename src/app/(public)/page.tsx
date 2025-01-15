import HomeTags from "@/components/HomeTags";
import Members from "@/components/Members";
import PostItem from "@/components/posts/PostItem";

const postDataArray = [
  {
    id: "1",
    title: "Introduction to TypeScript",
    author: {
      id: "a1",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://example.com/avatars/johndoe.jpg",
    },
    tags: [
      { id: "t1", name: "TypeScript" },
      { id: "t2", name: "JavaScript" },
    ],
    viewCount: 1500,
    likeCount: 200,
    commentCount: 35,
    isReact: false,
    createdAt: "2024-10-05T14:32:00Z",
  },
  {
    id: "2",
    title: "React for Beginners",
    author: {
      id: "a2",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://example.com/avatars/janesmith.jpg",
    },
    tags: [
      { id: "t3", name: "React" },
      { id: "t4", name: "Frontend" },
    ],
    viewCount: 2500,
    likeCount: 500,
    commentCount: 120,
    isReact: true,
    createdAt: "2025-01-10T09:15:00Z",
  },
  {
    id: "3",
    title: "Mastering CSS Grid",
    author: {
      id: "a3",
      name: "Emily Clark",
      username: "emilyclark",
      avatar: "https://example.com/avatars/emilyclark.jpg",
    },
    tags: [
      { id: "t5", name: "CSS" },
      { id: "t6", name: "Web Design" },
    ],
    viewCount: 1200,
    likeCount: 80,
    commentCount: 10,
    isReact: false,
    createdAt: "2024-12-20T18:45:00Z",
  },
  {
    id: "4",
    title: "Exploring GraphQL Basics",
    author: {
      id: "a4",
      name: "Carlos Lee",
      username: "carloslee",
      avatar: "https://example.com/avatars/carloslee.jpg",
    },
    tags: [
      { id: "t7", name: "GraphQL" },
      { id: "t8", name: "API" },
    ],
    viewCount: 1800,
    likeCount: 300,
    commentCount: 50,
    isReact: true,
    createdAt: "2024-11-12T11:30:00Z",
  },
  {
    id: "5",
    title: "JavaScript Async/Await Explained",
    author: {
      id: "a5",
      name: "Sarah Davis",
      username: "sarahdavis",
      avatar: "https://example.com/avatars/sarahdavis.jpg",
    },
    tags: [
      { id: "t9", name: "JavaScript" },
      { id: "t10", name: "Async Programming" },
    ],
    viewCount: 2000,
    likeCount: 450,
    commentCount: 75,
    isReact: false,
    createdAt: "2024-09-15T16:00:00Z",
  },
  {
    id: "6",
    title: "Building REST APIs with Node.js",
    author: {
      id: "a6",
      name: "Michael Brown",
      username: "michaelbrown",
      avatar: "https://example.com/avatars/michaelbrown.jpg",
    },
    tags: [
      { id: "t11", name: "Node.js" },
      { id: "t12", name: "REST APIs" },
    ],
    viewCount: 2200,
    likeCount: 600,
    commentCount: 130,
    isReact: false,
    createdAt: "2024-08-25T10:05:00Z",
  },
  {
    id: "7",
    title: "Vue.js vs React: A Comparison",
    author: {
      id: "a7",
      name: "David Martinez",
      username: "davidmartinez",
      avatar: "https://example.com/avatars/davidmartinez.jpg",
    },
    tags: [
      { id: "t13", name: "Vue.js" },
      { id: "t14", name: "React" },
    ],
    viewCount: 3500,
    likeCount: 750,
    commentCount: 180,
    isReact: true,
    createdAt: "2024-06-10T12:15:00Z",
  },
  {
    id: "8",
    title: "CSS Flexbox: A Deep Dive",
    author: {
      id: "a8",
      name: "Lily Zhang",
      username: "lilyzhang",
      avatar: "https://example.com/avatars/lilyzhang.jpg",
    },
    tags: [
      { id: "t15", name: "CSS" },
      { id: "t16", name: "Web Design" },
    ],
    viewCount: 1600,
    likeCount: 350,
    commentCount: 90,
    isReact: false,
    createdAt: "2024-07-30T17:25:00Z",
  },
  {
    id: "9",
    title: "Understanding Docker and Containers",
    author: {
      id: "a9",
      name: "Lucas White",
      username: "lucaswhite",
      avatar: "https://example.com/avatars/lucaswhite.jpg",
    },
    tags: [
      { id: "t17", name: "Docker" },
      { id: "t18", name: "DevOps" },
    ],
    viewCount: 2900,
    likeCount: 500,
    commentCount: 110,
    isReact: true,
    createdAt: "2024-11-18T13:20:00Z",
  },
  {
    id: "10",
    title: "The Importance of Web Accessibility",
    author: {
      id: "a10",
      name: "Olivia Taylor",
      username: "oliviataylor",
      avatar: "https://example.com/avatars/oliviataylor.jpg",
    },
    tags: [
      { id: "t19", name: "Web Accessibility" },
      { id: "t20", name: "Inclusive Design" },
    ],
    viewCount: 1700,
    likeCount: 250,
    commentCount: 60,
    isReact: false,
    createdAt: "2024-12-01T09:40:00Z",
  },
  {
    id: "11",
    title: "Introduction to Webpack 5",
    author: {
      id: "a11",
      name: "James Wilson",
      username: "jameswilson",
      avatar: "https://example.com/avatars/jameswilson.jpg",
    },
    tags: [
      { id: "t21", name: "Webpack" },
      { id: "t22", name: "JavaScript" },
    ],
    viewCount: 2100,
    likeCount: 400,
    commentCount: 85,
    isReact: true,
    createdAt: "2024-08-30T14:10:00Z",
  },
  {
    id: "12",
    title: "Exploring Machine Learning with Python",
    author: {
      id: "a12",
      name: "Ethan Clark",
      username: "ethanclark",
      avatar: "https://example.com/avatars/ethanclark.jpg",
    },
    tags: [
      { id: "t23", name: "Machine Learning" },
      { id: "t24", name: "Python" },
    ],
    viewCount: 3200,
    likeCount: 650,
    commentCount: 140,
    isReact: false,
    createdAt: "2024-05-05T16:00:00Z",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="flex gap-5">
      <aside className="sticky left-0 top-[76px] h-fit w-[20%] space-y-5">
        <HomeTags />
      </aside>
      <div className="w-[60%] space-y-5">
        {postDataArray?.map((postData, idx) => (
          <PostItem key={`post-${idx}`} postData={postData} />
        ))}
      </div>
      <aside className="sticky left-0 top-[76px] h-fit w-[20%] space-y-5">
        <Members />
      </aside>
    </div>
  );
};

export default HomePage;
