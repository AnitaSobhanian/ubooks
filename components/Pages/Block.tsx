export const Block = props => {

if (!props.state.faves)
{
    props.state.faves=[]
}


    return <f-x style={{ height: 200, width: 150, flex: 1, objectFit: "fill", minWidth: 150, position: "relative" }}>

        <img
            className={global.styles.hoverzoom_light_nofade}
            src={props.book.imageLink}
            style={{ height: 200, width: 150, flex: 1, objectFit: "fill", minWidth: 150 }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()
            }} />
        {props.state.faves.includes(props.book.title) ?
            <img src="https://cdn.ituring.ir/research/2/heart.png"
                style={{
                    height: 20, width: 20, objectFit: "contain",
                    position: "absolute", bottom: 10, left: 10
                }} /> : null}
    </f-x>
}