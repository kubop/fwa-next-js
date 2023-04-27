import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from "@/ts-types/types"

import { Column, DataGrid, Editing, FilterRow, SearchPanel, Selection, Summary, TotalItem } from 'devextreme-react/data-grid'
import CustomStore from "devextreme/data/custom_store"
import { createStore } from 'devextreme-aspnet-data-nojquery'

export const getServerSideProps: GetServerSideProps<{users: User[]}> = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_PATH_USER)
  const users: User[] = await res.json()

  return {
    props: {
      users,
    },
  }
}

export default function UsersDevExtreme(/*{ users }: InferGetServerSidePropsType<typeof getServerSideProps>*/) { 
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
                .then(res => res.json())
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
                
                {/*<Summary>
                    <TotalItem
                        customizeText={(data: any) => `Number of users: ${data.value}`}
                        column="userId"
                        summaryType="count"
                    />
                </Summary>*/}

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
