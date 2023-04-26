import { useUserEdits } from "@/contexts/UserEditsContext"

export default function Counter() {
    console.log('Rending Counter component')
    
    const numberOfEdits = useUserEdits()
    
    return (
        <>
            Number of user edits: {numberOfEdits}
        </>
    )
}