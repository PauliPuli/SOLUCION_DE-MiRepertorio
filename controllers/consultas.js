import db from '../config/db.js'; 

//CREAR FUNCIONES CRUD 

const traerData= async ()=>{
    try{
const consultarCancion={
    text:'select * from canciones ',
}
const response= await db.query(consultarCancion);
return response.rows
    }catch(error){
console.log(error.message)
    };
}

//agregar canciones
const agregarData= async (cancion)=>{
    try{
const agregarCancion= {
    text: 'insert into canciones (titulo, artista, tono) values ($1,$2,$3) returning *',
    values: cancion,
}
const response= await db.query(agregarCancion);
return response.rows
    }catch(error){
        console.log(error.message)
    }
};


const deleteData= async(id)=>{
    try{
        const borrarCancion= {
            text: 'delete from canciones where id=$1',
            values: [id]
        }
        const response= await db.query(borrarCancion);
        //Delete requiere validación
        if (response.rowCount == 0) {
            throw new Error("Cancion no encontrada");
          }
        return response.rows
    }catch(error){
        console.log(error.message)
    }

}

//editar
const updateData= async(cancion)=>{
    try{
        const actualizarCancion= {
            text: 'update canciones set titulo=$1, artista=$2, tono=$3 where id=$4 returning *',
            values: cancion
        }
        const response=await db.query(actualizarCancion);
        return response.rows
    }catch(error){

    }
}

export { traerData, agregarData , deleteData, updateData }