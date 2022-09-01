import { filterGames, orderGames, searchGames, searchGamesChange, postGames, filterApi, VideogamesAll } from "../actions"
function getBase64(file) {
    let image = document.getElementById("labelImage")
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        image.src = reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function validatorInputs(input) {
    let errors = {}

    if (!input.name) { errors.name = "Name Required" }
    else if (!input.description) errors.description = "Description is required"
    else if (!input.launchDate) errors.launchDate = "Launch date is required"
    else if (!input.rating || input.rating > 5 || input.rating < 0) errors.rating = "Rating is required, higher than 0 and less than 5"
    else if (!input.src) errors.src = "Image is required"

    return errors
}
export function handleFilterGames(e, dispatch) {
    e.preventDefault()
           dispatch(filterGames(e.target.value))
}
export function handleOrderGames(e, dispatch, setCurrenteGame, setOrderFilter) {
    e.preventDefault()
    dispatch(orderGames(e.target.value))
    setCurrenteGame(1)
    setOrderFilter(`Orderna OK ${e.target.value}`)
    return
}
export function handleSearch(e, setPayloadName, dispatch) {
    e.preventDefault()
    dispatch(searchGamesChange(e.target.value))
    return setPayloadName(e.target.value.toLowerCase())

}
export function handleSubmit(e, dispatch, payload) {
    e.preventDefault()
    dispatch(searchGames(payload))
}
export function handleInputAdd(e, setInputSend, inputSend, setErrors) {
    e.preventDefault()
    setInputSend({
        ...inputSend,
        [e.target.name]: e.target.value
    })
    setErrors(validatorInputs({
        ...inputSend,
        [e.target.name]: e.target.value
    }, setErrors))
}
export function handleInputAddImage(e, setInputSend, inputSend, setErrors) {
    getBase64(e.target.files[0])
    setTimeout(() => {
        let src = document.getElementById("labelImage").src
        setInputSend({
            ...inputSend,
            src
        })
        setErrors(validatorInputs({
            ...inputSend,
            src
        }, setErrors))
    }, 500);
    e.preventDefault()
}
export function handleAddPlatform(e, setInputSend, inputSend ) {
    setInputSend({
        ...inputSend,
        platform: [...inputSend.platform, e.target.value]
    })
}
export function handleAddGenders(e, setInputSend, inputSend, setAdds, generosAdds) {
    e.preventDefault()
    setInputSend({
        ...inputSend,
        genders: [...inputSend.genders, parseInt(e.target.value.split("-")[0])]
    })
    setAdds({
        ...generosAdds,
        genders: [...generosAdds.genders, e.target.value.split("-")[1]]
    })
}
export function handleSubmitCreate(e, setInputSend, inputSend, dispatch) {
    e.preventDefault()
    dispatch(postGames(inputSend))
    alert("GAME CREATED YOU CAN CREATE ANOTHER")
    setInputSend({
        name: "",
        description: "",
        launchDate: "",
        rating: "",
        genders: [],
        platform: []
    })
    document.getElementById("imageFile").value=""
    document.getElementById("labelImage").src=""


}
export function handleAPBD(e, dispatch) {
    e.preventDefault()
 dispatch(filterApi(e.target.value))
}
export function handleLoadAll(dispatch) {
    dispatch(VideogamesAll())
}