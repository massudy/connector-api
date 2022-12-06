import ConnectorMethod from "./ConnectorMethod.js"
import ConnectorsServer from "./ConnectorsServer.js"
import ConnectorRequest from "./ConnectorRequest.js"

class DocMethod {
    constructor(methodname,methodtype,fields = [{Name : '',Data : 'Body',Type : 'Number',Description : '',Requeried : true}]){
        this.Name = methodname
        this.Type = methodtype
        this.Fields = fields
    }
}


class Connector {
    constructor(name,methods = [new ConnectorMethod.Get(),new ConnectorMethod.Post()],config = {}){
        this.Name = name
        this.Methods = methods
        this.MethodsDoc = [new DocMethod()]
        this.MethodsDoc.splice(0,1)
        this.ConnectorDoc = {ConnectorName : this.Name,MethodsDoc : this.MethodsDoc}
        this.BuildDoc = () => {
            this.Methods.forEach(m => {
                m.Run()
                this.MethodsDoc.push(new DocMethod(m.Name,m.Method,m.MethodDoc))
            })
        this.ConnectorDoc.MethodsDoc = this.MethodsDoc
        }
        this.BuildDoc()
      
        //improve futuro, metodos de gerenciar todo os metodos desse conector
    }

static Method = {
    Post : ConnectorMethod.Post,
    Get : ConnectorMethod.Get
}

static Request = {
   Get : ConnectorRequest.Get,
   Post : ConnectorRequest.Post
}

static Server = ConnectorsServer

}


export default Connector