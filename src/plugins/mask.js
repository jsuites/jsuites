/*
 Add '*' as a valid symbol
 Formats such as 'DD"th of "MMMM", "YYYY'
 Conditional masking
 (000) 00000-00
 $ (#,##0.00);$ (-#,##0.00)
 $ (-#,##0.00)
 j.mask.render(0, { mask: 'mm:ss.0' }
 j.mask.render(0, { mask: '[h]:mm:ss' }, true)
 */


import { Mask } from '@jsuites/utils';

export default Mask;
