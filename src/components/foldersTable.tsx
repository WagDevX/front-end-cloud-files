
type Props = [
    {
        id: number,
        name: string,
        owner: number,
        exetention?: string,
        parentFolder: number,
    }
]
    


export const FoldersTable = (folders: Props) : JSX.Element => {
    return (
        <>
        <table className="basic">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Proprietário</th>
              </tr>
            </thead>
            <tbody>
                {folders.length > 0 && folders.map((folder,index) => (
                    <>
                    <tr key={`fol_${index}`}>
                    <td >
                        {folder.name}
                    </td>
                    <td >
                        {folder.exetention?? "Pasta"}
                    </td>
                    <td >
                        {folder.owner}
                    </td>
                    </tr>
                  
                    </>
                )) 
                    
                }
            
            </tbody>
          </table>

        </>
    )
}