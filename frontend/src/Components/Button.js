export function Button (props)

{
    return (
        
        <button onClick={() => props.func(props.msg)}>
            <p>Testing </p>
        </button>
    )
}