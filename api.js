import express from 'express';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import vendaMensal from './vendaMensal.js';


dotenv.config();



const app = express()
app.use(express.json())

const PORT = 3000




const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao DB")
    } catch (error) {
   console.log("Erro ao conectar ao banco", error)
   
   }
};

connectDB();

app.post("/vendas", async (req,res)=>{
    try {
        const novaVendaMensal = await vendaMensal.create(req.body);
        res.json(novaVendaMensal)
        console.log(novaVendaMensal) 
        
    } catch (error) {
        res.json({error: error})
        console.log(error)
        
    }
    
    
});



app.get("/vendas", async (req,res)=>{
    try { const vendasMensais = await vendaMensal.find();
        res.json(vendasMensais);
        
        
    } catch (error) {

    res.json({error: error})
        
    }
});


app.get("/vendas/:id", async (req,res)=>{
    try { const vendasMensais = await vendaMensal.findById(
        req.params.id,
        req.body
    );
        res.json(vendasMensais);
        
        
    } catch (error) {

    res.json({error: error})
        
    }
});





app.put("/vendas/:id",async (req,res)=>{
    try {
        const novaVendasMensal = await vendaMensal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}

        );
        res.json(novaVendasMensal)
        
    } catch (error) {
        res.json({error: error})
        
    }
});


app.delete("/vendas/:id", async (req,res)=>{
    try {const vendaMensalDeletada = await vendaMensal.findByIdAndDelete(
        req.params.id,
        {new : true}
    )
    res.json(vendaMensalDeletada)
        
    } catch (error) {
        res.json({error:error})
        
    }
})















app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)

})