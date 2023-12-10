import { useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { db } from "../../../firebase-config"; 
import { collection, addDoc, getDocs } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore';


export default function AddClient({ closeEvent }) {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [direccion,setDireccion] = useState('')
    const [telefono,setTelefono] = useState('')

    const setRows = useAppStore((state) => state.setRows); // traer los datos de firebase y guardarlos en rows  
    const empCollectionRef = collection(db, "agenda"); // referencia a la coleccion de firebase


    const handleNombreChange = (e) => {
        setNombre(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleDireccionChange = (e) => {
        setDireccion(e.target.value)
    }
    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value)
    }



    const getClients = async () => { // traer los datos de firebase y guardarlos en rows
        const data = await getDocs(empCollectionRef);  // getDocs: lee todos los documentos de una colección  getDocs(collection(db, "users"));
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const createProduct = async () => {
        await addDoc(empCollectionRef, {
            direccion:direccion,
            email:email,
            nombre: nombre,
            telefono:telefono,
        });
        getClients();
        closeEvent();
        Swal.fire("Success", "Agregado con éxito!", "success");
    }

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
                Agregar Cliente
            </Typography>
            <IconButton
                style={{ position: 'absolute', right: '0', top: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={nombre}
                        onChange={handleNombreChange}
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Direccion"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={direccion}
                        onChange={handleDireccionChange}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Telefono"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={telefono}
                        onChange={handleTelefonoChange}
                    >
                    </TextField>
                </Grid>


                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button
                            variant="contained"
                            sx={{ minWidth: "100%" }}
                            onClick={createProduct}
                        >
                            Add
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    )
}
