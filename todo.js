module.exports = function(sequelize,Sequelize){

    return sequelize.define("todo",{
        description :{
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [1,250]
            }
        },    
        complated : {
            type : Sequelize.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
    });
}