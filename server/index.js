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

function greet(call,callback){
    var firstName = call.request.greeting.first_name;
    var lasttName = call.request.greeting.last_name;

    callback(null,{
        result : `hello ${firstName} -- ${lasttName}`
    })
}

function main(){

    const server = new grpc.Server();

    server.addService(greetPackageDefinition.GreetService.service,{
        greet : greet
    });
    let host = "localhost:50051";
    server.bind(host,grpc.ServerCredentials.createInsecure())
    server.start()
    console.log(`running at ${host}`);
}
main()