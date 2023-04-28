import { Column, DataGrid, Editing, FilterRow, SearchPanel, Selection, Summary, TotalItem } from 'devextreme-react/data-grid'
import CustomStore from "devextreme/data/custom_store"
import notify from 'devextreme/ui/notify'

export default function UsersDevExtreme() { 
    console.log('Rendering dev-extreme page')

    const formattedValues = (key: any, values: object) => {
        const fValues: any = []

        for (const property in values) {
            const op = {
                "op": "add",
                "path": property,
                "value": values[property as keyof typeof values]
            }
            fValues.push(op)
        }

        console.log(fValues)

        return fValues
    }

    const store = new CustomStore({
        key: 'userId',
        loadMode: 'raw',
        load: async (options) => {
            return fetch(process.env.NEXT_PUBLIC_API_PATH_USER)
                .then(res => res.json())
                .catch(err => { throw new Error(err) })
        },
        remove: async (key) => {
            return fetch(`${process.env.NEXT_PUBLIC_API_PATH_USER}/${encodeURIComponent(key)}`, {
                method: 'DELETE'
            }).then(res => {
                if (res.ok) {
                    notify("Record deleted", "success")
                } else {
                    notify(`Error occured: ${res.status}`, "error")
                }
            }).catch(err => { throw new Error(err) })
        },
        update: async (key, values) => {
            console.log(values)
            return fetch(`${process.env.NEXT_PUBLIC_API_PATH_USER}/${encodeURIComponent(key)}`, {
                method: 'PATCH',
                body: JSON.stringify(formattedValues(key, values)),
                headers:{
                    'Content-Type': 'application/json-patch+json'
                }
            })
            .then(() => console.log('success'))
            .catch(() => { throw 'Network error' });
        }
    })

    return (
        <main className="flex items-center justify-center p-12">
            <DataGrid id="datagrid-users"
                dataSource={store}
                remoteOperations={true}
                keyExpr="userId"
                showBorders={true}
            >
                <Column dataField="userId" caption="Id" visible={true} allowEditing={false}/>

                <Column caption="User Details" alignment="center">
                    <Column dataField="firstName"/>
                    <Column dataField="lastName"/>
                    <Column dataField="login"/>
                </Column>

                <Column dataField="address"/>

                <FilterRow visible={true} />
                <SearchPanel visible={true} />

                <Selection mode="single" />

                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                />
            </DataGrid>
        </main>
    )
}
