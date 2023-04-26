import { Dispatch, createContext, useContext, useEffect, useReducer } from "react"

export const UserEditsContext = createContext<number>(0)
export const UserEditsDispatchContext = createContext<Dispatch<object>>(() => {})

export function UserEditsProvider({ children }: { children: React.ReactNode }) {
    const [age, dispatch] = useReducer(
        ageReducer,
        0
    )

    useEffect(() => {
        // Define an async function to fetch the data from the database
        async function fetchData() {
            const response = await fetch(process.env.NEXT_PUBLIC_API_PATH_USER);
            const json = await response.json();
            console.log(json)

            // 33% change of incrementing value
            const rnd = Math.random() * 100
            if (rnd <= 33) {
                console.log('We are incrementing!')
                dispatch({
                    type: 'increment',
                    byValue: 1
                })
            } else {
                console.log('We are NOT incrementing!')
                // Do nothing?
            }
        }

        // Call the fetch function immediately to initialize the data
        fetchData();

        // Set up an interval to fetch the data every 5 seconds
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UserEditsContext.Provider value={age}>
            <UserEditsDispatchContext.Provider value={dispatch}>
                {children}
            </UserEditsDispatchContext.Provider>
        </UserEditsContext.Provider>
    )
}

function ageReducer(age: number, action: any) {
    switch (action.type) {
        case 'update':
            // TODO: Update from DB, average age is ... 5
            return 5
        case 'increment': 
            // Just a testing function
            return age + action.byValue
        default:
            throw Error('Unknown action: ' + action)
    }
}

export function useUserEdits() {
    return useContext(UserEditsContext)
}
export function useUserEditsDispatch() {
    return useContext(UserEditsDispatchContext)
}