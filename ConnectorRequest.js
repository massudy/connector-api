import axios from 'axios'

const ConnectorRequest = {
    Get : async (url = '',config = {Body : {},SingleParameter : ''}) => {

        let objreturn = {
            status : 404,
            data : {}
        }

        let Full_URL = ''
        let SingleParameter = ''
        
        if(url.slice(-1) == '/'){
            Full_URL = `${url}`
        } else {
            Full_URL = `${url}/`
        }
    
        if(config.SingleParameter != ''){
            Full_URL = `${Full_URL}${SingleParameter}`
        }
       
        const response = await axios.get(Full_URL,config.Body).catch(e => {})
        if(response){
            objreturn.status = response.status
            if(response.data){
                objreturn.data = response.data
            }
        }
    
    return objreturn
    },
    Post : async (url = '',config = {Body : {},SingleParameter : ''}) => {

        let objreturn = {
            status : 404,
            data : {}
        }

        let Full_URL = ''
        let SingleParameter = ''
        
        if(url.slice(-1) == '/'){
            Full_URL = `${url}`
        } else {
            Full_URL = `${url}/`
        }
    
        if(config.SingleParameter != ''){
            Full_URL = `${Full_URL}${SingleParameter}`
        }
       
        const response = await axios.post(Full_URL,config.Body).catch(e => {})
        if(response){
            objreturn.status = response.status
            if(response.data){
                objreturn.data = response.data
            }
        }
    
    return objreturn
    }
}

export default ConnectorRequest