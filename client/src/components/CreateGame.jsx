import { useEffect, useState } from "react"
import { VideogamesAll, postGames} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { handleAddPlatform, handleAddGenders, handleSubmitCreate, handleInputAdd, handleInputAddImage, getBase64} from '../module/module'
import { Link, useHistory,  } from "react-router-dom";
import './body.css'
import './createGame.css'
export default function CreateGame(s) {
    const dispatch = useDispatch()
    const generosGet = useSelector((state) => state.gender)
    const platformGet = useSelector((state) => state.platform)
    const [generosAdds, setAdds] = useState({
        genders:[]
    })
    const [inputSend, setInputSend] = useState({
        name: "",
        description: "",
        launchDate:"",
        rating:"",
        genders: [],
        platform: [],
    })
    const history = useHistory()
    const [errors, setErrors] = useState({})
    useEffect(() => {
        dispatch(VideogamesAll())
    }, [dispatch])
    console.log(generosAdds);
    if (generosGet && platformGet) {
        const platformSet = new Set(platformGet.flat())
        const errorsLen = Object.keys(errors).length === 0
        return (
            <div className="containerDiv">
                <form onSubmit={e => handleSubmitCreate(e, setInputSend, inputSend, dispatch, history)} >
                    <div className="divCreate">
                        <div className="dvInputCreate">
                            <label >{errors.name && <p>{errors.name}</p>}</label>
                            <input className="inputCreate" placeholder="Name" value={inputSend.name} name="name" onChange={e => handleInputAdd(e, setInputSend, inputSend, setErrors)} />
                        </div>
                        <div className="dvInputCreate">
                            <label>{errors.description && <p>{errors.description}</p>}</label>
                            <input className="inputCreate" placeholder="Description" value={inputSend.description} name="description" onChange={e => handleInputAdd(e, setInputSend, inputSend, setErrors)} />
                        </div>
                        <div className="dvInputCreate">
                            <label>{errors.launchDate && <p>{errors.launchDate}</p>}</label>
                            <input className="inputCreate" placeholder="Launch Date" type="date" value={inputSend.launchDate} name="launchDate" onChange={e => handleInputAdd(e, setInputSend, inputSend, setErrors)} />
                        </div>
                        <div className="dvInputCreate">
                            <label>{errors.rating && <p>{errors.rating}</p>}</label>
                            <input className="inputCreate" type="number" placeholder="Rating" value={inputSend.rating} name="rating" onChange={e => handleInputAdd(e, setInputSend, inputSend, setErrors)} />
                        </div>
                        <div className="dvInputCreate">
                            <label>{errors.src && <p>{errors.src}</p>}</label>
                            <label><img id="labelImage" className="imageLabel" src=""></img></label>
                            <input className="inputCreate" id="imageFile" type="file" placeholder="Image" value={inputSend.image} name="image" 
                            onChange={e => handleInputAddImage(e, setInputSend, inputSend, setErrors)} />
                        </div>
                    </div> 
                    <div className="divCreate">
                        <div className="divSelect">

                            <select className="selectCreate" onChange={e => handleAddGenders(e, setInputSend, inputSend, setAdds, generosAdds)}>
                                <option defaultValue>Genders</option>
                                {generosGet.map(e => <option value={`${e.id}-${e.gender}`} key={e.id}>{e.gender}</option>)}
                            </select>

                            <select onChange={e => handleAddPlatform(e, setInputSend, inputSend)}>
                                <option defaultValue>Platform</option>
                                {[...platformSet].map(el =>
                                    <option value={el} key={el}>{el}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="labelCreate"> {inputSend.platform.map(e => { return (<label>{e} </label>) })} </label>
                        </div>
                        <div>
                            <label className="labelCreate"> {generosAdds?.genders.map(e => { return (<label>{e} - </label>) })} </label>
                        </div>
                    </div>
                <div>
                    <button type="submit" disabled={ !errorsLen > 0 } >Create Game!</button>
                    <Link to="/home">
                        <button >Back to home</button>
                    </Link>
                </div>
                </form>
            </div>
        )
    }
}