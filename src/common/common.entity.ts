/**
 * @author ddaninthe
 */

import { Column } from "typeorm";

export abstract class CommonEntity {
    @Column({ default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
    
    @Column({ default: true })
    enabled: boolean;
}