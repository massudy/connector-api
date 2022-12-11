import axios from 'axios'

const ConnectorRequest = {
    Get : async (url = '',config = {Body : {},Params : {},SingleParameter : ''}) => {

        let objreturn = {
            Status : 404,
            Data : {},
            Errors : []
        }
        
        let Full_URL = ''
        let Parameter = ''
        let SingleParameter = ''
        
        Full_URL = url
       
        
        if(config.Params){
            if(Object.keys(config.Params).length < 1){
                
                if(url.slice(-1) == '/'){
                    Full_URL = `${url}`
                } else {
                    Full_URL = `${url}/`
                }
                
                if(config.SingleParameter){
                    if(config.SingleParameter != ''){
                        SingleParameter = config.SingleParameter
                        Full_URL = `${Full_URL}${SingleParameter}`
                    }
                }
            } else {
                Object.keys(config.Params).forEach((parameter_key,i) => {
                    if(i == 0){
                        Full_URL = `${Full_URL}?${parameter_key}=${config.Params[parameter_key]}`
                    } else {
                        Full_URL = `${Full_URL}&${parameter_key}=${config.Params[parameter_key]}`
                    }
                })
            }
        } else {
            
            if(url.slice(-1) == '/'){
                Full_URL = `${url}`
            } else {
                Full_URL = `${url}/`
            }

            if(config.SingleParameter){
                if(config.SingleParameter != ''){
                    SingleParameter = config.SingleParameter
                    Full_URL = `${Full_URL}${SingleParameter}`
                }
            }
        }
        
       
        const response = await axios.get(Full_URL,{data : config.Body}).catch(e => {})
        
        if(response){
            objreturn.Status = response.status
            if(response.data){
                if(response.data.Data){
                    objreturn.Data = response.data.Data
                } else {
                    objreturn.Data = response.data
                }
                if(response.data.Errors){
                    objreturn.Errors = [...response.data.Errors]
                }
            }
        }
    
    return objreturn
    },
    Post : async (url = '',config = {Body : {},Params : {},SingleParameter : ''}) => {

        let objreturn = {
            Status : 404,
            Data : {},
            Errors : []
        }

        let Full_URL = ''
        let SingleParameter = ''
        
        Full_URL = url
    
        if(config.Params){
            if(Object.keys(config.Params).length < 1){
                
                if(url.slice(-1) == '/'){
                    Full_URL = `${url}`
                } else {
                    Full_URL = `${url}/`
                }
                
                if(config.SingleParameter){
                    if(config.SingleParameter != ''){
                        SingleParameter = config.SingleParameter
                        Full_URL = `${Full_URL}${SingleParameter}`
                    }
                }
            } else {
                Object.keys(config.Params).forEach((parameter_key,i) => {
                    if(i == 0){
                        Full_URL = `${Full_URL}?${parameter_key}=${config.Params[parameter_key]}`
                    } else {
                        Full_URL = `${Full_URL}&${parameter_key}=${config.Params[parameter_key]}`
                    }
                })
            }
        } else {

            if(url.slice(-1) == '/'){
                Full_URL = `${url}`
            } else {
                Full_URL = `${url}/`
            }

            if(config.SingleParameter){
                if(config.SingleParameter != ''){
                    SingleParameter = config.SingleParameter
                    Full_URL = `${Full_URL}${SingleParameter}`
                }
            }
        }
       
        const response = await axios.post(Full_URL,config.Body).catch(e => {})
        if(response){
            objreturn.Status = response.status
            if(response.data){
                if(response.data.Data){
                    objreturn.Data = response.data.Data
                } else {
                    objreturn.Data = response.data
                }
                if(response.data.Errors){
                    objreturn.Errors = [...response.data.Errors]
                }
            }
        }
    
    return objreturn
    }
}

export default ConnectorRequest