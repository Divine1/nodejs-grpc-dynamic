const path = require("path")
const protoloader = require("@grpc/proto-loader");
const grpc = require("grpc");


const greetProtoPath = path.join(__dirname,"..","proto","greet.proto");
const greetProtoDefinition = protoloader.loadSync(greetProtoPath,{
    keepCase: true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
})

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet;

let host = "localhost:50051";

const client = new greetPackageDefinition.GreetService(host,
    grpc.credentials.createInsecure()
    )

function callGreetings(){
    var request = {
        greeting : {
            first_name : "divine",
            last_name : "ch"
        }
    }
    client.greet(request,(err,res)=>{
        if(err){
            console.log("err ",err)
        }
        else{
            console.log("res ",res);
        }
    })
}
function main(){
    callGreetings();
}

main()