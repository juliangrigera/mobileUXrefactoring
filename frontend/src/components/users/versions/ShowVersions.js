import React, {useEffect, useState} from 'react';
import { Nav, Tab, Container, Row, Col , Card, Button} from 'bootstrap-4-react/lib/components';
import { BsTrash, BsPencil, BsFillLayersFill } from "react-icons/bs";
import UserRefactoring from '../UserRefactorings';
import QRCode from 'react-qr-code';
import ModalConfirmDeleteVersion from '../../modals/ModalConfirmDeleteVersion';
import ModalDuplicateVersion from '../../modals/ModalDuplicateVersion';
import ModalUpdateVersion from '../../modals/ModalUpdateVersion';
import { useHistory } from 'react-router';
import Loader from "react-loader-spinner";
// MODALS
import ModalAddVersion from '../../modals/ModalAddVersion';
import ModalConfirmDelete from '../../modals/ModalConfirmDelete';
import ModalUpdateRefactoring from "../../modals/ModalUpdateRefactoring";

const ShowVersions = () => {

    const history = useHistory();

    //---Para pasar de un hijo al padre necesito pasarle una funcion al hijo
    // en la cual pueda cambiar el valor del estado de la variable del padre
    const [refactoring, setRefactoring] = useState({
        refName: "",
        elements: [String],
        params: Object
    });
    const refactoringToPass = (valor) => {
        //console.log(valor);
        setRefactoring(valor);
        //console.log(refactoring);
    }
    //------------------------------------------------------------------

    //------Trabajar con los modals------------
    const [update, setUpdate] = useState(false);

    const [versions, setVersion] = useState([])    

    useEffect(() => {
        getVersions().then(data => setVersion(data)).catch(e => console.log(e));
        if(update){
            console.log("actualice");
            setUpdate(false);
            window.location.reload();

        }
    }, [update])
    const getVersions = async () => {
        const response = await fetch('/versions/' + localStorage.getItem('usertoken'), {
            headers: { "authorization": localStorage.getItem('token') }
        });
        const body = await response.json();
        console.log(body);
        if (!body.success && body.success!=='undefined') {
            if(body.status===403){
                localStorage.removeItem('token');
                localStorage.removeItem('usertoken');
            }
            throw Error(body.message)
        }
        return body.versions;
    }

    const navbarVersions = (versions) => {
        console.log(versions);
        const listVersions = versions.map((version, index) =>
            <Nav.ItemLink href={"#"+version.tag} id={version.tag+"-tab"} data-toggle="tab" aria-selected={(index > 0) ? false : true} className={(index > 0) ? "" : "active show"}>
                {version.tag}
            </Nav.ItemLink>
        )
        return (<Nav tabs role="tablist">
                    {listVersions}
                    <Nav.ItemLink data-toggle="modal" data-target="#addVersionForm">
                        <h2>+</h2>
                    </Nav.ItemLink>
                 </Nav>)
    }

    const tabpaneVersions = (versions) => {
        const listVersions = versions.map((version, index) => 
            
            <Tab.Pane id={version.tag} aria-labelledby={version.tag + "-tab"} className={(index === 0 )? "active show" : "" }>
                <Container>
                    <Row pt="2" pb="2">
                        <Col>
                            <Row pt="2" pb="2">
                                <Col col="8 md-4"><span className="font-weight-bold ">Nombre </span></Col>
                                <Col col="8 md-6">{version.name}</Col>
                            </Row>
                            <Row pt="2" pb="2">
                                <Col col="8 md-4"><span className="font-weight-bold ">Descripcion</span></Col>
                                <Col col="8 md-6">{version.description}</Col>
                            </Row>
                            <Row pt="2" pb="2">
                                <Col col="8 md-4"><span className="font-weight-bold ">QR-url</span></Col>
                                <Col col="8 md-6"><a href={"https://"+version.qrUrl} target="_blank" rel="noreferrer">{version.qrUrl}</a></Col>
                            </Row>
                        </Col>
                        <Col>
                            <h4>Codigo QR</h4>
                            <QRCode id="QRCode" value={version.qrUrl}></QRCode>
                        </Col>
                        <Col md="auto">
                            <Row pt="2" pb="2">
                                <Button primary data-toggle="modal" data-target={"#modify-" + version.tag}><BsPencil /> Editar Versión</Button>
                            </Row>
                            <Row pt="2" pb="2">
                                <Button primary data-toggle="modal" data-target={"#duplicate-" + version.tag}><BsFillLayersFill /> Duplicar Versión</Button>
                            </Row>
                            <Row pt="2" pb="2">
                                <Button danger data-toggle="modal" data-target={"#delete-" + version.tag}><BsTrash /> Eliminar Versión</Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <UserRefactoring tag={version.tag} test={refactoringToPass} update={update} setUpdate={setUpdate}/>
                <Button mx="auto" primary onClick={() => history.replace('./addRefactoring')}>Agregar Nuevo Refactoring</Button>
                <ModalUpdateVersion version={version} setUpdate={setUpdate}/>
                <ModalDuplicateVersion version={version} setUpdate={setUpdate} />
                <ModalConfirmDeleteVersion version={version} setUpdate={setUpdate}/>
            </Tab.Pane>
        )
        return (<Tab.Content>
            {listVersions}
        </Tab.Content>)
    }
    

    return(<><Card mt="3">
    <Card.Body>
        <Card.Title>Versiones con los refactorings aplicados a cada una de ellas</Card.Title>
            {(versions.length > 0) ?
                navbarVersions(versions)
                : <Row style={{'text-aling':'center'}}>
                    <Col col="sm"></Col>
                    <Col col="sm"><Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={150}
                    /></Col>
                    <Col col="sm"></Col>
                </Row>
            }
            {(versions.length > 0) ?
                tabpaneVersions(versions)
                : ''
            }
      </Card.Body>
      </Card>
      <ModalConfirmDelete refactoring={refactoring} setUpdate={setUpdate}/>
      <ModalUpdateRefactoring refactoring={refactoring}  setUpdate={setUpdate}/>
      <ModalAddVersion setUpdate={setUpdate}/>
      </>)
}

export default ShowVersions;