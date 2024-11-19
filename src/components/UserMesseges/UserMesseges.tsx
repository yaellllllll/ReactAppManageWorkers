import React, { FC,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import My_Modal from '../My_Modal/My_Modal';
import ApiService from '../../services/Api.service';


interface MyModalProps {
 idUser:number
 nameUser:string
}

const UserMesseges: FC<MyModalProps> = (props) => {
    const [data, setData] = useState<any>(null); // State to store user messages
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
      const getUserMessages = async () => {
        try {
          const response = await ApiService.getUserMesseges(5);
          setData(response.data);
          setShowModal(true);
        } catch (error) {
          console.error('Error fetching user messages:', error);
        }
      };
  
      getUserMessages();
    }, []);
  
    const approveFunc=()=>{
        alert("got it!")
    }

    return (
      <div>
       {showModal&&(
       <My_Modal
       modalTitle={`Messege Of User${props.nameUser}`}
       onApproveClick={approveFunc}
       showModal={showModal}
       onClose={() => setShowModal(false)}
     >
       {data.body}
     </My_Modal>
       )}

      </div>
    );
  };
  
  export default UserMesseges;