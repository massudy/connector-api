# Connector API - Easy way to create and manage https requests between aplications

## Install
```
npm i connector-api
```

## Getting Started
```
import Connector from "connector-api";

class HelloWorld extends Connector.Method.Get{  // << Creating Connector route/method caled HelloWorld
    constructor(){
        super('hello',async (props) => {
            
            console.log('Hello World') 
            
            this.Status(props.ID,200) // << Returning status code 200 to request
        
        })
    }
}

const TestConnector = new Connector('test',[new HelloWorld]) // << Creating a Connector instance

const server = new Connector.Server(3000,[TestConnector]) // << Creating a Connector Server 
```
## Full Documentation
[Portuguese-BR](https://connector-api.notion.site/Guia-e294740e67ee485a88df62bc04c71464)