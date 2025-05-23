import Swal from 'sweetalert2';

const useToast = () => {
    const showToast = ({ title, icon = 'success', position = 'top-end', timer = 3000 }) => {
        Swal.fire({
            icon,
            title,
            toast: true,
            position,
            timer,
            showConfirmButton: false,
        });
    };

    return { showToast };
};

export default useToast;
