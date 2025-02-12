export const TOKEN_EXPIRES_TIME = 2 * 60 * 60 * 1000;

export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "14rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export const POST_TITLE_SIZE = 200;
export const POST_DESCRIPTION_SIZE = 2000;

// export const breadcrumbList = [
//   {
//     pageName: "/dashboard",
//     breadcrumbLink: [
//       {
//         pathName: "dashboard",
//         path: "/dashboard",
//       },
//     ],
//   },
//   {
//     pageName: "/dashboard/posts",
//     breadcrumbLink: [
//       {
//         pathName: "dashboard",
//         path: "/dashboard",
//       },
//       {
//         pathName: "All posts",
//         path: "/dashboard/posts",
//       },
//     ],
//   },
//   {
//     pageName: "/dashboard/posts/add-post",
//     breadcrumbLink: [
//       {
//         pathName: "dashboard",
//         path: "/dashboard",
//       },
//       {
//         pathName: "All posts",
//         path: "/dashboard/posts",
//       },
//       {
//         pathName: "Add post",
//         path: "/dashboard/posts/add-post",
//       },
//     ],
//   },
//   {
//     pageName: "/dashboard/profile",
//     breadcrumbLink: [
//       {
//         pathName: "Profile setting",
//         path: "/dashboard/profile",
//       },
//     ],
//   },
// ];

export type BreadcrumbListType = {
  pathName: string;
  path: string;
  children?: BreadcrumbListType[];
};

export const breadcrumbList: BreadcrumbListType = {
  pathName: "Dashboard",
  path: "/dashboard",
  children: [
    {
      pathName: "All posts",
      path: "/dashboard/posts",
      children: [
        {
          pathName: "Add post",
          path: "/dashboard/posts/add-post",
        },
      ],
    },
    {
      pathName: "Profile Settings",
      path: "/dashboard/profile",
    },
  ],
};
