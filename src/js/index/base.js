/*
 * @Date: 2022-12-27 15:11:35
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-07 17:23:22
 * @FilePath: \3.0-manger\src\js\index\base.js
 * @description: globaljs
 */
import DetailsDisclosure from '../components/details-disclosure'
import DetailsModal from '../components/details-modal'
import PredictiveSearch from '../components/private-search'

customElements.define('details-disclosure', DetailsDisclosure);
customElements.define('details-modal', DetailsModal);
customElements.define('predictive-search', PredictiveSearch);