import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from "@/ts-types/types"

import { Column, DataGrid, Editing, FilterRow, SearchPanel, Selection, Summary, TotalItem } from 'devextreme-react/data-grid'
import CustomStore from "devextreme/data/custom_store"

export default function UsersDevExtreme() { 
    console.log('Rendering dev-extreme page')

    const store = new CustomStore({
        key: 'userId',
        loadMode: 'raw',
        load: async (options) => {
            return fetch('https://127.0.0.1:7005/api/user')
                .then(res => res.json())
                .catch(err => { throw new Error(err) })
        },
        remove: async (key) => {
            return fetch(`https://127.0.0.1:7005/api/user/${encodeURIComponent(key)}`, {
                method: 'DELETE'
            })
                .then(res => console.log('Remove success'))
                .catch(err => { throw new Error(err) })
        },
        update: async (key, values) => {
            console.log(values)
            return fetch(`https://127.0.0.1:7005/api/user/${encodeURIComponent(key)}`, {
                method: 'PATCH',
                body: JSON.stringify([
                    {
                      "path": "firstName",
                      "op": "replace",
                      "value": "test"
                    }
                  ]),
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
