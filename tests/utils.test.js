const jSuites = require('../dist/jsuites');

describe('utils', () => {
    test('path', () => {
        // Helper to create a fresh test object
        const createTestObject = () => ({
            address: {
                number: { test: 123 },
                zip: 123,
            },
            empty: {},
            nullProp: null,
            undefinedProp: undefined,
            nonObject: 456,
            array: [1, { name: 'item' }, 3],
        });

        // === Write Mode Tests (20) ===
        // 1. Write to existing deep path
        let obj1 = createTestObject();
        expect(jSuites.path.call(obj1, 'address.number.test', 999)).toBe(true);
        expect(obj1.address.number.test).toBe(999);

        // 2. Write to new deep path
        let obj2 = createTestObject();
        expect(jSuites.path.call(obj2, 'address.city.name', 'New York')).toBe(true);
        expect(obj2.address.city.name).toBe('New York');

        // 3. Write to null property
        let obj3 = createTestObject();
        expect(jSuites.path.call(obj3, 'nullProp.zip', 12345)).toBe(true);
        expect(obj3.nullProp.zip).toBe(12345);

        // 4. Write to undefined property
        let obj4 = createTestObject();
        expect(jSuites.path.call(obj4, 'undefinedProp.code', 54321)).toBe(true);
        expect(obj4.undefinedProp.code).toBe(54321);

        // 5. Write to non-object property
        let obj5 = createTestObject();
        expect(jSuites.path.call(obj5, 'nonObject.value', 789)).toBe(true);
        expect(obj5.nonObject.value).toBe(789);

        // 6. Write to shallow path
        let obj6 = createTestObject();
        expect(jSuites.path.call(obj6, 'address', { new: 'value' })).toBe(true);
        expect(obj6.address.new).toBe('value');

        // 7. Write to empty object
        let obj7 = createTestObject();
        expect(jSuites.path.call(obj7, 'empty.key', 'value')).toBe(true);
        expect(obj7.empty.key).toBe('value');

        // 8. Write to array element (assuming no array index support)
        let obj8 = createTestObject();
        expect(jSuites.path.call(obj8, 'array.1.name', 'updated')).toBe(true);
        expect(obj8.array[1].name).toBe('updated');

        // 9. Write with empty path
        let obj9 = createTestObject();
        expect(jSuites.path.call(obj9, '', 'value')).toBe(undefined);
        expect(obj9).toEqual(createTestObject());

        // 10. Write with non-string path
        let obj10 = createTestObject();
        expect(jSuites.path.call(obj10, null, 'value')).toBe(undefined);
        expect(obj10).toEqual(createTestObject());

        // 11. Write with malformed path (double dot)
        //let obj11 = createTestObject();
        //expect(jSuites.path.call(obj11, 'address..zip', 999)).toBe(undefined);
        //expect(obj11).toEqual(createTestObject());

        // 12. Write to root object
        let obj12 = {};
        expect(jSuites.path.call(obj12, 'key', 'value')).toBe(true);
        expect(obj12.key).toBe('value');

        // 13. Write with numeric value
        let obj13 = createTestObject();
        expect(jSuites.path.call(obj13, 'address.number.value', 0)).toBe(true);
        expect(obj13.address.number.value).toBe(0);

        // 14. Write with null value
        let obj14 = createTestObject();
        expect(jSuites.path.call(obj14, 'address.number.null', null)).toBe(true);
        expect(obj14.address.number.null).toBe(null);

        // 16. Write to very deep path
        let obj16 = createTestObject();
        expect(jSuites.path.call(obj16, 'a.b.c.d.e', 5)).toBe(true);
        expect(obj16.a.b.c.d.e).toBe(5);

        // 17. Write to path with existing object
        let obj17 = createTestObject();
        expect(jSuites.path.call(obj17, 'address.number', { new: 'obj' })).toBe(true);
        expect(obj17.address.number.new).toBe('obj');

        // 18. Write with empty key in path
        //let obj18 = createTestObject();
        //expect(jSuites.path.call(obj18, 'address.', 'value')).toBe(undefined);
        //expect(obj18).toEqual(createTestObject());

        // 19. Write with invalid root
        //let obj19 = null;
        //expect(jSuites.path.call(obj19, 'key', 'value')).toBe(undefined);
        //expect(obj19).toBe(null);

        // 20. Write with non-object parent
        let obj20 = { parent: 123 };
        expect(jSuites.path.call(obj20, 'parent.key', 'value')).toBe(true);
        expect(obj20.parent.key).toBe('value');

        // === Read Mode Tests (20) ===
        // 1. Read existing deep path
        let obj21 = createTestObject();
        expect(jSuites.path.call(obj21, 'address.number.test')).toBe(123);

        // 2. Read existing shallow path
        let obj22 = createTestObject();
        expect(jSuites.path.call(obj22, 'address.zip')).toBe(123);

        // 3. Read non-existent path
        let obj23 = createTestObject();
        expect(jSuites.path.call(obj23, 'address.city')).toBe(undefined);

        // 4. Read null property
        let obj24 = createTestObject();
        expect(jSuites.path.call(obj24, 'nullProp.zip')).toBe(undefined);

        // 5. Read undefined property
        let obj25 = createTestObject();
        expect(jSuites.path.call(obj25, 'undefinedProp.code')).toBe(undefined);

        // 6. Read non-object property
        let obj26 = createTestObject();
        expect(jSuites.path.call(obj26, 'nonObject.value')).toBe(undefined);

        // 7. Read empty object
        let obj27 = createTestObject();
        expect(jSuites.path.call(obj27, 'empty.key')).toBe(undefined);

        // 8. Read array element property
        let obj28 = createTestObject();
        expect(jSuites.path.call(obj28, 'array.1.name')).toBe('item');

        // 9. Read empty path
        let obj29 = createTestObject();
        expect(jSuites.path.call(obj29, '')).toBe(undefined);

        // 10. Read non-string path
        let obj30 = createTestObject();
        expect(jSuites.path.call(obj30, null)).toBe(undefined);

        // 11. Read malformed path (double dot)
        //let obj31 = createTestObject();
        //expect(jSuites.path.call(obj31, 'address..zip')).toBe(undefined);

        // 12. Read from empty object
        let obj32 = {};
        expect(jSuites.path.call(obj32, 'key')).toBe(undefined);

        // 13. Read from null root
        let obj33 = null;
        expect(jSuites.path.call(obj33, 'key')).toBe(undefined);

        // 14. Read from undefined root
        let obj34 = undefined;
        expect(jSuites.path.call(obj34, 'key')).toBe(undefined);

        // 15. Read very deep non-existent path
        let obj35 = createTestObject();
        expect(jSuites.path.call(obj35, 'a.b.c.d.e')).toBe(undefined);

        // 16. Read path with numeric value
        let obj36 = { key: 0 };
        expect(jSuites.path.call(obj36, 'key')).toBe(0);

        // 17. Read path with null value
        let obj37 = { key: null };
        expect(jSuites.path.call(obj37, 'key')).toBe(null);

        // 18. Read path with undefined value
        let obj38 = { key: undefined };
        expect(jSuites.path.call(obj38, 'key')).toBe(undefined);

        // 19. Read path with object value
        let obj39 = createTestObject();
        expect(jSuites.path.call(obj39, 'address.number')).toEqual({ test: 123 });

        // 20. Read path with empty key
        let obj40 = createTestObject();
        expect(jSuites.path.call(obj40, 'address.')).toBe(undefined);

        // === Erase Mode Tests (10) ===
        // 1. Erase existing deep path
        let obj41 = createTestObject();
        expect(jSuites.path.call(obj41, 'address.number.test', null, true)).toBe(true);
        expect(obj41.address.number.test).toBe(undefined);

        // 2. Erase existing shallow path
        let obj42 = createTestObject();
        expect(jSuites.path.call(obj42, 'address.zip', null, true)).toBe(true);
        expect(obj42.address.zip).toBe(undefined);

        // 3. Erase non-existent path
        let obj43 = createTestObject();
        expect(jSuites.path.call(obj43, 'address.city', null, true)).toBe(false);
        expect(obj43.address.city).toBe(undefined);

        // 4. Erase null property
        let obj44 = createTestObject();
        expect(jSuites.path.call(obj44, 'nullProp.zip', null, true)).toBe(false);
        expect(obj44.nullProp.zip).toBe(undefined);

        // 5. Erase from empty object
        let obj45 = createTestObject();
        expect(jSuites.path.call(obj45, 'empty.key', null, true)).toBe(false);
        expect(obj45.empty.key).toBe(undefined);

        // 6. Erase with empty path
        let obj46 = createTestObject();
        expect(jSuites.path.call(obj46, '', null, true)).toBe(undefined);
        expect(obj46).toEqual(createTestObject());

        // 7. Erase with non-string path
        let obj47 = createTestObject();
        expect(jSuites.path.call(obj47, null, null, true)).toBe(undefined);
        expect(obj47).toEqual(createTestObject());

        // 8. Erase with malformed path
        //let obj48 = createTestObject();
        //expect(jSuites.path.call(obj48, 'address..zip', null, true)).toBe(undefined);
        //expect(obj48).toEqual(createTestObject());

        // 9. Erase from null root
        //let obj49 = null;
        //expect(jSuites.path.call(obj49, 'key', null, true)).toBe(undefined);
        //expect(obj49).toBe(null);
    });
});