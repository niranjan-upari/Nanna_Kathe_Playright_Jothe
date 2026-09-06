class ApiUtils{

    constructor(ApiContext,loginPayload){
        this.ApiContext = ApiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data : this.loginPayload
            }
        )
            //expect(loginResponse.ok()).toBeTruthy() //200 OK
            const loginResponseJSON = await loginResponse.json()
            const token = loginResponseJSON.token;
            console.log(token)
            return token;
    }


    async createOrder(orderPayload){

            let response = {};  
            response.token = await this.getToken();      
            const orderResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data : orderPayload,
                    headers : {
                                'Authorization' : response.token,
                                'Content-Type' : 'application/json'
                              }
                }
        
            )
            const orderResponseJson = await orderResponse.json()
            console.log(orderResponseJson)
            const orderId = orderResponseJson.orders[0]
            response.orderId = orderId;
            return response;
    }
}
module.exports ={ApiUtils}