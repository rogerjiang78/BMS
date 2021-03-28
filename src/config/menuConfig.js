import {
  AppstoreOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', //菜单标题名称
    key: '/home', //对应的path
    icon: <DesktopOutlined />, //图标名称
    isPublic: true, //这是为公开的界面 所有用户都可以看到
  },
  {
    title: '商品',
    key: '/prod_about',
    icon: <AppstoreOutlined />,
    children: [
      //子菜单列表
      {
        title: '品类管理',
        key: '/prod_about/category',
        icon: <MailOutlined />,
      },
      {
        title: '商品管理',
        key: '/prod_about/product',
        icon: <MailOutlined />,
      },
    ],
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <ContainerOutlined />,
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: <LineChartOutlined />,
      },
      {
        title: '饼状图',
        key: '/charts/pie',
        icon: <PieChartOutlined />,
      },
    ],
  },
];

export default menuList;
