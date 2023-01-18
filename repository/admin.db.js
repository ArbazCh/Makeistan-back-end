const loginAdminDb = async ({ loginId }) => {
    try {
      const query = `SELECT * FROM admin where "loginId" = $1 LIMIT 1`;
      // console.log("Inside Db");
      const result = await dbConfig.query(query, [loginId]);
      // console.log("Login DB: ", result);
      return result;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  module.exports = {loginAdminDb };