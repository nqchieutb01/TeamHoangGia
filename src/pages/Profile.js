// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//
// export default function Profile(){
//     return (
//         <Tabs>
//             <TabList>
//                 <Tab>
//                     <p>Title 1</p>
//                 </Tab>
//                 <Tab>
//                     <p>Title 2</p>
//                 </Tab>
//                 <Tab>
//                     <p>Title 3</p>
//                 </Tab>
//                 <Tab>
//                     <p>Title 4</p>
//                 </Tab>
//                 <Tab>
//                     <p>Title 5</p>
//                 </Tab>
//             </TabList>
//
//             <TabPanel>
//                 <div className="panel-content">
//                     <h2>Any content 1</h2>
//                 </div>
//             </TabPanel>
//             <TabPanel>
//                 <div className="panel-content">
//                     <h2>Any content 2</h2>
//                 </div>
//             </TabPanel>
//             <TabPanel>
//                 <div className="panel-content">
//                     <h2>Any content 3</h2>
//                 </div>
//             </TabPanel>
//             <TabPanel>
//                 <div className="panel-content">
//                     <h2>Any content 4</h2>
//                 </div>
//             </TabPanel>
//             <TabPanel>
//                 <div className="panel-content">
//                     <h2>Any content 5</h2>
//                 </div>
//             </TabPanel>
//         </Tabs>
//     )
// }
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from "react-icons/all";
export default function Profile() {
    return (
    <ProSidebar>
        <Menu iconShape="square">
            <MenuItem icon={<FaGem/>}>Dashboard</MenuItem>
            <SubMenu title="Components" icon={<FaHeart/>}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
            </SubMenu>
        </Menu>
    </ProSidebar>);
}