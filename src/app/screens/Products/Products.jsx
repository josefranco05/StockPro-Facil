import { MdDelete, MdEdit } from "react-icons/md";
import CrudPage from "@/app/components/shared/CrudPage/CrudPage";
import { FormProduct } from "@/app/screens/Products/FormProduct";

const model = {
    code: "",
    name: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    category: "",
    stock: "",
};

const columns = ({ onEdit, onDelete }) => [
    { field: "firstName", headerName: "Nombre", flex: 1 },
    { field: "lastName", headerName: "Apellido", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Teléfono", width: 150 },
    { field: "documentType", headerName: "Tipo Doc", width: 150 },
    { field: "documentNumber", headerName: "Número Doc", width: 150 },
    {
        field: "actions",
        headerName: "Acciones",
        width: 180,
        renderCell: (params) => (
            <>
                <MdEdit
                    style={{ cursor: "pointer", marginRight: 10 }}
                    size={20}
                    onClick={() => onEdit(params.row)}
                />
                <MdDelete
                    style={{ cursor: "pointer", color: "red" }}
                    size={20}
                    onClick={() => onDelete(params.row)}
                />
            </>
        ),
    },
];

export default function Products() {
    return (
        <CrudPage
            title="Gestión de Productos"
            apiEndpoint="/api/products"
            model={model}
            columns={columns}
            FormComponent={FormProduct}
        />
    );
}
