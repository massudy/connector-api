import CodeGenerator from "./useful/CodeGenerator.js"
import ResponseModel from "./ResponseModel.js"

class BaseMethod {
    constructor(name = '',actionresponse = async (props = {ID : '', Body : {},Parameter : ''}) => {},config = {parameter : false}){
        
        class ActionBuild {
            constructor(id){
                this.ID = id
                this.Response = new ResponseModel()
                this.Props = {ID : '',Body : {}, Parameter : ''}
                this.SetupBuild = false
            }
        }

        this.Builds = [new ActionBuild(999999)] 
        this.Builds.splice(0,1)
        

        this.Build = {
            Create : (setup_build = false) => {
                let idcode
                let created = false
                while(!created){
                idcode = CodeGenerator.AlfaNumeric(6)
                const exist = this.Builds.findIndex(build => build.ID == idcode)
                if(exist == -1){
                this.Builds.push(new ActionBuild(idcode))
                this.Build.Get(idcode).SetupBuild = setup_build
                created = true	
                } 
                }
                return idcode
            },
            Get : (id) => {
                return this.Builds[this.Builds.findIndex(b => b.ID == id)]
            },
            Delete : (id) => {
                const index = this.Builds.findIndex(b => b.ID == id)
                if(index != -1){
                    this.Builds.splice(index,1)
                    return true
                } else {
                    return false
                }
            }
        }

        this.Data = (id,data = {}) => {
            this.Build.Get(id).Response.Data = data
        }

        this.Status = (id,statuscode = 200) => {
            this.Build.Get(id).Response.Status = statuscode
        }

        this.Errors = (id,errors = []) => {
            this.Build.Get(id).Response.Errors = errors
        }

        this.Error = (id,error) => {
            this.Build.Get(id).Response.Errors.push(error)
        }

            
            this.Object = (config = {description : '',requeried : true,parameter : false}) => {
                
            let objreturn = {Name : '',Data : 'Body',Type : 'Object',Description : '',Requeried : true}
            if(typeof config.requeried == Boolean){objreturn.Requeried = config.requeried}
            objreturn.Description = config.description
            if(config.parameter){objreturn.Data = 'Parameter'}
            
            if(objreturn.Description == '' || objreturn.Description == undefined){delete objreturn.Description}
            return objreturn
        }

            this.String = (config = {description : '',requeried : true,parameter : false}) => {
                
                let objreturn = {Name : '',Data : 'Body',Type : 'String',Description : '',Requeried : true}
                if(typeof config.requeried == Boolean){objreturn.Requeried = config.requeried}
                objreturn.Description = config.description
                if(config.parameter){objreturn.Data = 'Parameter'}
                
                if(objreturn.Description == '' || objreturn.Description == undefined){delete objreturn.Description}
                return objreturn
            }

            this.Number = (config = {description : '',requeried : true,parameter : false}) => {
                
                let objreturn = {Name : '',Data : 'Body',Type : 'Number',Description : '',Requeried : true}
                if(typeof config.requeried == Boolean){objreturn.Requeried = config.requeried}
                objreturn.Description = config.description
                if(config.parameter){objreturn.Data = 'Parameter'}
                
                if(objreturn.Description == '' || objreturn.Description == undefined){delete objreturn.Description}
                return objreturn
            }

     
            this.ModelResponse = async (id,model_object = {},execution = async () => {}) => {
                
                let doc = [{Name : '',Data : 'Body',Type : 'Number',Description : '',Requeried : true}]
                doc.splice(0,1)

                Object.keys(model_object).forEach((key) => {
                let doc_object = model_object[key]
                doc_object.Name = key
                doc.push(doc_object)
                })

                this.MethodDoc = doc
                 
                let errors = []
                
                doc.forEach(field => {
                    if(field.Requeried){
                        let field_ok = false
                        Object.keys(this.Build.Get(id).Props.Body).forEach((key) => {
                            if(field.Name == key){field_ok = true}
                        })
                    if(!field_ok){errors.push(`O Campo ${field.Name}-${field.Type} é obrigatorio e não foi reconhecido no ${field.Data}`)}
                    }
                    
                })

                if(errors.length == 0){
                    await execution()
                } else {
                    this.Build.Get(id).Response.Status = 400
                    this.Build.Get(id).Response.Errors = [...errors]
                }
                
               
            }
    

        this.Name = name
        this.MethodDoc = [{Name : '',Data : 'Body',Type : 'Number',Description : '',Requeried : true}]
        this.MethodDoc.splice(0,1)
        this.Config = config
        
        this.Run = async (props = {ID : '', Body : {},Parameter : ''},setup_run = false) => {
            props.ID = this.Build.Create(setup_run)
            this.Build.Get(props.ID).Props = props
            await actionresponse(props)
            const objresponse = this.Build.Get(props.ID).Response
            this.Build.Delete(props.ID)
            return objresponse
        }
        
        
    }
}
class ConnectorPost extends BaseMethod {
   constructor(name = '',actionresponse = async (props = {ID : '', Body : {},Parameter : ''}) => {},config = {parameter : false}){
    super(name,actionresponse,config)
    this.Method = 'post'
   }
}


class ConnectorGet extends BaseMethod {
    constructor(name = '',actionresponse = async (props = {ID : '', Body : {},Parameter : ''}) => {},config = {parameter : false}){
     super(name,actionresponse,config)
     this.Method = 'get'
    }
 }


const ConnectorMethod = {
    Post : ConnectorPost,
    Get : ConnectorGet
}


export default ConnectorMethod