import express, { json } from 'express'
import Connector from './Connector.js'

class ConnectorsServer {
    constructor(port,connectors = [new Connector]){

        this.Connectors = connectors
        this.Port = port
        this.ServerDoc = [this.Connectors[0].ConnectorDoc]
        this.ServerDoc.splice(0,1)
        this.Connectors.forEach(connector => {
            this.ServerDoc.push(connector.ConnectorDoc)
        })
        this.app = express()
        this.app.use(json())
        

        this.Connectors.forEach(connector => {
            connector.Methods.forEach(method => {
                
                method.Run()
                let path = ''
                if(method.Name == ''){
                    path = `${connector.Name}`
                } else {
                    path = `${connector.Name}/${method.Name}`
                }

                if(method.Method.toLowerCase() == 'get'){
                
                    if(method.Config.parameter){
                        
                        this.app.get(`/${path}/:value`, async (req,res) => {
                            
                            const response = await method.Run({Body : req.body,Parameter : req.params.value})
                            res.status(response.Status)
                            res.send(response)
                        
                        })
                    } else {
        
                        this.app.get(`/${path}`, async (req,res) => {
                            
                            const response = await method.Run({Body : req.body})
                            res.status(response.Status)
                            res.send(response)
                        
                        })
        
                    }
        
                } else if(method.Method.toLowerCase() == 'post'){
        
                    if(method.Config.parameter){
                        this.app.post(`/${path}/:value`, async (req,res) => {
                            
                            const response = await method.Run({Body : req.body,Parameter : req.params.value})
                            res.status(response.Status)
                            res.send(response)
                        
                        })
                    } else {
        
                        this.app.post(`/${path}`, async (req,res) => {
                            
                            const response = await method.Run({Body : req.body})
                            res.status(response.Status)
                            res.send(response)
                        
                        })
        
                    }
        
                }
            })
        })

        this.app.listen(this.Port,() => {
            console.log(`Server running with ${this.Connectors.length} connectors...`)
        })
    }
}

export default ConnectorsServer