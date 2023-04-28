import { Address, User } from '@/ts-types/types'
import { Column, DataGrid, Editing, FilterRow, Lookup, SearchPanel, Selection, Summary, TotalItem } from 'devextreme-react/data-grid'
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

        return fValues
    }

    const lookupAddressSource = {
        store: new CustomStore({
            key: "addressId",
            loadMode: "raw",
            load: () => {
                return fetch(process.env.NEXT_PUBLIC_API_PATH_ADDRESS)
                    .then(response => response.json())
                    .catch(() => { throw 'Network error' })
            }
        })
    };

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
            }).then((res) => {
                if (res.ok) {
                    notify("Record updated", "success")
                } else {
                    notify(`Error occured: ${res.status}`, "error")
                }
            }).catch(() => { throw 'Network error' });
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

                <Column dataField="addressId" calculateDisplayValue={(row:User) => row.address}>
                    <Lookup
                        dataSource={lookupAddressSource}
                        displayExpr={(row:Address) => { 
                            return `${row.street} ${row.number}, ${row.zipCode} ${row.city}`
                        }}
                        valueExpr={"addressId"}
                    />
                </Column>

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
