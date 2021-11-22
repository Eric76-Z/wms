export const carModel = [
  {
    text: "CPH2.1",
    children: ["BSUV", "COUPE", "BMPV"],
  },
  {
    text: "CPH2.2",
    children: ["KAROQ", "THARU", "CSUV"],
  },
];
export const deviceType = [
  {
    text: "机器人",
    localBy: "robot",
  },
  {
    text: "焊枪",
    localBy: "weldinggun",
  },
  {
    text: "修模器",
    localBy: "weldinggun",
  },
  {
    text: "激光焊",
    localBy: "robot",
  },
  {
    text: "其他",
    localBy: "robot",
  },
];

export const maintenanceFlow = [];

export const sortModel = {
  type_layer_robot: "020100",
  type_layer_weldinggun: "020200",
  type_layer_tipdresser: "020300",
};

export const userGroupLocalMap = {
  "CPH2.1": 8,
  "CPH2.2": 9,
  UB: 10,
  AB: 11,
  ABT: 12,
  ST: 13,
  装配: 14,
  调整: 15,
  A班: 16,
  B班: 17,
};

export const userGroupRoleMap = {
  维修技术员: 2,
  维修工长: 3,
  维修班长: 4,
  维修工: 5,
};
