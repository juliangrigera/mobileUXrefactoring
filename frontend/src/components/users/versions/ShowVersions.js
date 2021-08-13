import React, {useEffect, useState} from 'react';
import { Nav, Tab, Container, Row, Col } from 'bootstrap-4-react/lib/components';
import UserRefactoring from '../UserRefactorings';

const ShowVersions = () => {
    const [versions, setVersion] = useState([])    

    useEffect(() => {
        getVersions().then(data => setVersion(data)).catch(e => console.log(e))
    }, [])
    const getVersions = async () => {
        const response = await fetch('/versions/' + localStorage.getItem('usertoken'), {
            headers: { "authorization": localStorage.getItem('token') }
        });
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
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
                 </Nav>)
    }

    const tabpaneVersions = (versions) => {
        const listVersions = versions.map((version, index) => 
            
            <Tab.Pane id={version.tag} aria-labelledby={version.tag + "-tab"} className={(index === 0 )? "active show" : "" }>
                <Container>
                    <Row pt="2" pb="2">
                        <Col col="8 md-2"><span className="font-weight-bold ">Nombre</span></Col>
                        <Col col="8 md-6">{version.name}</Col>
                    </Row>
                    <Row pt="2" pb="2">
                        <Col col="8 md-2"><span className="font-weight-bold ">Descripcion</span></Col>
                        <Col col="8 md-6">{version.description}</Col>
                    </Row>
                    <Row pt="2" pb="2">
                        <Col col="8 md-2"><span className="font-weight-bold ">QR-url</span></Col>
                        <Col col="8 md-6">{version.qrUrl}</Col>
                    </Row>
                </Container>
                <UserRefactoring tag={version.tag}/>
            </Tab.Pane>
        )
        return (<Tab.Content>
            {listVersions}
        </Tab.Content>)
    }
    

    return(<React.Fragment>
             {(versions.length > 0) ?
                            navbarVersions(versions)
                            : <option>loading...</option>
                        }
           {(versions.length > 0) ?
                            tabpaneVersions(versions)
                            : <option>loading...</option>
                        }
      </React.Fragment>)
}

export default ShowVersions;