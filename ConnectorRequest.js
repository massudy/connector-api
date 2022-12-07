import axios from 'axios'
import ResponseModel from './ResponseModel.js'

const ConnectorRequest = {
    Get : async (url = '',config = {Body : {},SingleParameter : ''}) => {

        let objreturn = new ResponseModel()
        
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
    Post : async (url = '',config = {Body : {},SingleParameter : ''}) => {

        let objreturn = new ResponseModel()

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