const { Sequelize } = require('sequelize');

module.exports = new Sequelize('bsjmxunxse3ohwxxds04', 'uuwryvtxvszdlnid', 'HDqwY86up2vJnGRSbSA', {
//module.exports = new Sequelize('orbit_applications', 'node_user', 'G3tagr1p()', {   
    
    
    //LOCAL TEST -
    /*
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        "timezone": "Etc/GMT-4"
    },
    */

    ///CLEVER MIND server
    
    host: 'hv-mtl2-010.clvrcld.net',
    dialect: 'mysql',
    port: '10789',
    dialectOptions: {
        "timezone": "Etc/GMT-4"
    },
    
     pool: {
         max: 5,
         min: 0,
         acquire: 3000,
         idle: 1000
     },
   });
   
    
    // SITEGROUND - new Sequelize('souths47_orbit-applications', 'souths47_orbitu', 'FtttD3~8oGdS', {
   /*host: '35.209.224.60',
   dialect: 'mysql',
   dialectOptions: {
       "timezone": "Etc/GMT-4"
   },
   */

  